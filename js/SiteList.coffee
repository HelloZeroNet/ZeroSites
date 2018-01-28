class SiteList extends Class
	constructor: (@row) ->
		@item_list = new ItemList(Site, "site_id")
		@sites = @item_list.items
		@item_list.sync(@row.sites)
		@limit = 10

	isHidden: ->
		if Page.site_lists.filter_category == null
			return false
		else
			return Page.site_lists.filter_category != @row.id

	handleMoreClick: =>
		@limit += 20
		@nolimit = true
		return false

	render: (i) ->
		if @row.title == "Other" and Page.site_lists.filter_category != @row.id and Page.site_lists.cols == 3
			return @renderWide(i)
		if Page.site_lists.filter_category == @row.id
			limit = 100
		else
			limit = @limit
		if @sites.length == 0
			clear = false
		else
			clear = (i % Page.site_lists.cols == 1)
		h("div.sitelist", {key: @row.id, classes: {empty: @sites.length == 0, hidden: @isHidden(), selected: Page.site_lists.filter_category == @row.id, nolimit: @nolimit, clear: clear},}, [
			h("a.categoryname", {href: "?Category:#{@row.id}:#{Text.toUrl(@row.title)}", onclick: Page.handleLinkClick}, @row.title),
			h("div.sites", [
				@sites[0..limit-1].map (item) ->
					item.render()
				if @sites.length > limit
					h("a.more", {href: "?Category:#{@row.id}:#{Text.toUrl(@row.title)}", onclick: @handleMoreClick, enterAnimation: Animation.slideDown, exitAnimation: Animation.slideUp}, "Show more...")
			])
		])

	renderWide: (i) ->
		cols = [0,1,2]
		clear = false
		limit = @limit
		if @sites.length < limit * 3
			limit = Math.ceil(@sites.length / 3)
		h("div.sitelist-wide", [
			cols.map (col) =>
				h("div.sitelist.col-#{col}", {key: @row.id, classes: {empty: @sites.length == 0, hidden: @isHidden(), selected: Page.site_lists.filter_category == @row.id, clear: clear},}, [
					h("a.categoryname", {href: "?Category:#{@row.id}:#{Text.toUrl(@row.title)}", onclick: Page.handleLinkClick}, @row.title),
					h("div.sites", [
						@sites[0+col*limit..col*limit + limit-1].map (item) ->
							item.render()
					])
				])
			if @sites.length > limit * cols.length
				h("a.more", {href: "?Category:#{@row.id}:#{Text.toUrl(@row.title)}", onclick: @handleMoreClick, enterAnimation: Animation.slideDown}, "Show more...")
		])

window.SiteList = SiteList