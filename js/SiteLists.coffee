class SiteLists extends Class
	constructor: ->
		@menu_filters = new Menu()
		@state = null
		@filter_lang = {}
		@site_add = new SiteAdd()
		@site_lists = []
		@site_lists_db = {}
		@need_update = false

		@loaded = false
		@num_total = null

		Page.on_site_info.then =>
			Page.on_local_storage.then =>
				@filter_lang = Page.local_storage.filter_lang
				for [id, title] in Page.site_info.content.settings.categories
					site_list = new SiteList({id: id, title: title, sites: []})
					@site_lists_db[id] = site_list
					@site_lists.push(site_list)
				@update()

		window.onresize = =>
			if window.innerWidth < 720
				@cols = 1
			else if window.innerWidth < 1200
				@cols = 2
			else
				@cols = 3
			@log "Cols: #{@cols}"
			Page.projector.scheduleRender()
		window.onresize()

	update: ->
		if Page.head.active == "new"
			order = "date_added DESC"
		else
			order = "MIN(200, peers) + star * 20 DESC, title"

		filters = []
		if not isEmpty(@filter_lang)
			filters.push "language IN " + Text.sqlIn(lang for lang of @filter_lang)

		query = """
			SELECT site.*, json.*, COUNT(site_star.site_uri) AS star, site_stat.*
			FROM site
			LEFT JOIN json USING (json_id)
			LEFT JOIN site_star ON (site_star.site_uri = json.directory || "_" || site.site_id)
			LEFT JOIN site_stat ON (site_stat.site_uri = json.directory || "_" || site.site_id)
			#{if filters.length then "WHERE " + filters.join(" AND ") else ""}
			GROUP BY site.json_id, site_id
			ORDER BY #{order}
		"""
		@logStart("Sites")
		Page.cmd "dbQuery", query, (rows) =>
			sites_db = {}
			# Group by category
			for row in rows
				sites_db[row["category"]] ?= []
				sites_db[row["category"]].push(row)

			# Sync items
			for category, site_list of @site_lists_db
				site_list.item_list.sync(sites_db[category] or [])

			@loaded = true
			@num_total = rows.length
			@logEnd "Sites", "found: #{@num_total}"
			Page.on_loaded.resolve()

			Page.projector.scheduleRender()

	handleFilterLanguageClick: (e) =>
		value = e.currentTarget.value
		if value == "all"
			for key of @filter_lang
				delete @filter_lang[key]
		else if @filter_lang[value]
			delete @filter_lang[value]
		else
			@filter_lang[value] = true
		Page.saveLocalStorage()
		Page.projector.scheduleRender()
		@update()
		return false

	renderFilterLanguage: =>
		h("div.menu-radio",
			h("div", "Site languages: "),
			h("a.all", {href: "#all", onclick: @handleFilterLanguageClick, value: "all", classes: {selected: isEmpty(@filter_lang)}}, "Show all")
			for lang in Page.languages
				[
					h("a", {href: "#"+lang, onclick: @handleFilterLanguageClick, value: lang, classes: {selected: @filter_lang[lang], long: lang.length > 2}}, lang),
					" "
				]
		)

	handleFiltersClick: =>
		@menu_filters.items = []
		@menu_filters.items.push [@renderFilterLanguage, null ]
		if @menu_filters.visible
			@menu_filters.hide()
		else
			@menu_filters.show()
		return false

	handleSiteAddClick: =>
		if @state == "siteadd"
			@state = null
		else
			@state = "siteadd"
		@site_add.updateDb()
		return false

	formatFilterTitle: =>
		if isEmpty(@filter_lang)
			return "None"
		else
			return (lang for lang, _ of @filter_lang).join(", ")

	setFilterCategory: (@filter_category) =>
		if @loaded
			setTimeout ( =>
				Page.on_loaded.resolve()
			), 600

	getVisibleSiteLists: =>
		if @filter_category
			return [@site_lists_db[@filter_category]]
		else
			return @site_lists

	render: =>
		if @need_update
			@need_update = false
			@update()
		i = 0

		num_found = 0
		for site_list in @site_lists
			if not site_list.isHidden()
				num_found += site_list.sites.length

		h("div#SiteLists", {classes: {"state-siteadd": @state == "siteadd"}},
			if @loaded then h("div.sitelists-right", [
				if Page.site_info?.cert_user_id
					h("a.certselect.right-link", {href: "#Select", onclick: Page.user.certSelect}, [
						h("span.symbol", "⎔"),
						h("span.title", "User: #{Page.site_info.cert_user_id}")
					])
				h("a.filter.right-link", {href: "#Filters", onmousedown: @handleFiltersClick, onclick: Page.returnFalse}, [
					h("span.symbol", "◇"),
					h("span.title", "Filter: " + @formatFilterTitle())
				])
				@menu_filters.render(".filter")
				h("a.siteadd.right-link", {href: "#", onclick: @handleSiteAddClick}, [
					h("span.symbol", "＋"),
					h("span.title", "Submit new site")
				])
			])
			@site_add.render(),
			if num_found == 0 and not isEmpty(@filter_lang)
				h("h1.empty", {enterAnimation: Animation.slideDown, exitAnimation: Animation.slideUp}, "No sites found for languages: #{(lang for lang of @filter_lang).join(', ')}")
			if @loaded then h("div.sitelists", @site_lists.map (site_list) ->
				if site_list.sites.length
					i++
					num_found += site_list.sites.length
				site_list.render(i)
			)
			h("div.clear", " ")
		)

	onSiteInfo: (site_info) ->
		if site_info.event
			[action, inner_path] = site_info.event
			if action == "file_done" and inner_path.endsWith("json")
				RateLimit 1000, =>
					@need_update = true
					Page.projector.scheduleRender()

window.SiteLists = SiteLists