window.h = maquette.h

class Play extends ZeroFrame
	init: ->
		@params = {}
		@site_info = null
		@server_info = null

		@on_site_info = new Promise()
		@on_local_storage = new Promise()

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
			@route(base.href.replace(/.*?\?/, ""))

		@projector.replace($("#Head"), @head.render)
		@projector.replace($("#SiteLists"), @site_lists.render)

	# Route site urls
	route: (query) ->
		@params = Text.parseQuery(query)
		@log "Route", @params

	# Add/remove/change parameter to current site url
	createUrl: (key, val) ->
		params = JSON.parse(JSON.stringify(@params))  # Clone
		if typeof key == "Object"
			vals = key
			for key, val of keys
				params[key] = val
		else
			params[key] = val
		return "?"+Text.encodeQuery(params)


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
		@loadLocalStorage()
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
		else
			@log "Unknown command", params

	setSiteInfo: (site_info) ->
		@site_info = site_info
		@on_site_info.resolve()
		@site_lists.onSiteInfo(site_info)
		@user.onSiteInfo(site_info)

	setServerInfo: (server_info) ->
		@server_info = server_info
		@projector.scheduleRender()

	# Simple return false to avoid link clicks
	returnFalse: ->
		return false

window.Page = new Play()
window.Page.createProjector()