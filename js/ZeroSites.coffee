window.h = maquette.h

class ZeroSites extends ZeroFrame
	init: ->
		@params = {}
		@site_info = null
		@server_info = null
		@history_state = {}

		@on_site_info = new Promise()
		@on_local_storage = new Promise()
		@on_loaded = new Promise()

		@user = new User()
		@on_site_info.then =>
			@user.setAuthAddress(@site_info.auth_address)

		@local_storage = null
		@languages = []
		@categories = []
		@on_site_info.then =>
			@languages = @site_info.content.settings.languages
			@categories = @site_info.content.settings.categories


	createProjector: ->
		@projector = maquette.createProjector()
		@head = new Head()
		@site_lists = new SiteLists()

		if base.href.indexOf("?") == -1
			@route("")
		else
			url = base.href.replace(/.*?\?/, "")
			@route(url)
			@history_state["url"] = url

		# Remove fake long body
		@on_loaded.then =>
			@log "onloaded"
			window.requestAnimationFrame ->
				document.body.className = "loaded"

		@projector.replace($("#Head"), @head.render)
		@projector.replace($("#SiteLists"), @site_lists.render)
		@loadLocalStorage()

		# Update every minute to keep time since fields up-to date
		setInterval ( ->
			Page.projector.scheduleRender()
		), 60*1000

	setFormEdit: (form_edit) ->
		form_edit.hidden = false
		@projector.replace($("#FormEdit"), form_edit.render)

	# Route site urls
	route: (query) ->
		@params = Text.parseQuery(query)
		[page, param] = @params.url.split(":")
		@content = @site_lists
		if page == "Category"
			@site_lists.setFilterCategory(parseInt(param))
		else
			@site_lists.setFilterCategory(null)
		Page.projector.scheduleRender()
		@log "Route", page, param

	setUrl: (url, mode="push") ->
		url = url.replace(/.*?\?/, "")
		@log "setUrl", @history_state["url"], "->", url
		if @history_state["url"] == url
			@content.update()
			return false
		@history_state["url"] = url
		if mode == "replace"
			@cmd "wrapperReplaceState", [@history_state, "", url]
		else
			@cmd "wrapperPushState", [@history_state, "", url]
		@route url
		return false


	handleLinkClick: (e) =>
		if e.which == 2
			# Middle click dont do anything
			return true
		else
			@log "save scrollTop", window.pageYOffset
			@history_state["scrollTop"] = window.pageYOffset
			@cmd "wrapperReplaceState", [@history_state, null]

			if document.body.scrollTop > 100
				anime({targets: document.body, scrollTop: 0, easing: "easeOutCubic", duration: 300})

			@history_state["scrollTop"] = 0

			@on_loaded.resolved = false
			document.body.className = ""

			@setUrl e.currentTarget.search
			return false


	# Add/remove/change parameter to current site url
	createUrl: (key, val) ->
		params = JSON.parse(JSON.stringify(@params))  # Clone
		if typeof key == "Object"
			vals = key
			for key, val of keys
				params[key] = val
		else
			params[key] = val
		return "?"+Text.queryEncode(params)

	loadLocalStorage: ->
		@on_site_info.then =>
			@log "Loading localstorage"
			@cmd "wrapperGetLocalStorage", [], (@local_storage) =>
				@log "Loaded localstorage"
				@local_storage ?= {}
				@local_storage.filter_lang ?= {}
				@on_local_storage.resolve()

	saveLocalStorage: (cb) ->
		if @local_storage
			@cmd "wrapperSetLocalStorage", @local_storage, (res) =>
				if cb then cb(res)


	onOpenWebsocket: (e) =>
		@reloadSiteInfo()
		@reloadServerInfo()

	reloadSiteInfo: =>
		@cmd "siteInfo", {}, (site_info) =>
			@setSiteInfo(site_info)

	reloadServerInfo: =>
		@cmd "serverInfo", {}, (server_info) =>
			@setServerInfo(server_info)

	# Parse incoming requests from UiWebsocket server
	onRequest: (cmd, params) ->
		if cmd == "setSiteInfo" # Site updated
			@setSiteInfo(params)
		else if cmd == "wrapperPopState" # Site updated
			@log "wrapperPopState", params
			if params.state
				if not params.state.url
					params.state.url = params.href.replace /.*\?/, ""
				@on_loaded.resolved = false
				document.body.className = ""
				window.scroll(window.pageXOffset, params.state.scrollTop or 0)
				@route(params.state.url or "")
		else
			@log "Unknown command", cmd, params

	setSiteInfo: (site_info) ->
		@site_info = site_info
		@on_site_info.resolve()
		@site_lists.onSiteInfo(site_info)
		@user.onSiteInfo(site_info)
		@projector.scheduleRender()

	setServerInfo: (server_info) ->
		@server_info = server_info
		@projector.scheduleRender()

	# Simple return false to avoid link clicks
	returnFalse: ->
		return false

window.Page = new ZeroSites()
window.Page.createProjector()