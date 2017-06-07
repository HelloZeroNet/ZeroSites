class SiteList
	constructor: (@row) ->
		@item_list = new ItemList(Site, "site_id")
		@sites = @item_list.items
		@item_list.sync(@row.sites)

	isHidden: ->
		if Page.site_lists.filter_category == null
			return false
		else
			return Page.site_lists.filter_category != @row.id

	render: (i) ->
		if Page.site_lists.filter_category == @row.id
			limit = 100
		else
			limit = 6
		if @sites.length == 0
			clear = false
		else
			clear = (i % Page.site_lists.cols == 1)
		h("div.sitelist", {key: @row.id, classes: {empty: @sites.length == 0, hidden: @isHidden(), selected: Page.site_lists.filter_category == @row.id, clear: clear},}, [
			h("h2", @row.title),
			h("div.sites", [
				@sites[0..limit].map (item) ->
					item.render()
				if @sites.length > limit
					h("a.more", {href: "?Category:#{@row.id}:#{Text.toUrl(@row.title)}", onclick: Page.handleLinkClick, enterAnimation: Animation.slideDown}, "Show more...")
			])
		])

window.SiteList = SiteList