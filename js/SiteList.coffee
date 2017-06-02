class SiteList
	constructor: (@row) ->
		@item_list = new ItemList(Site, "site_id")
		@sites = @item_list.items
		@item_list.sync(@row.sites)

	render: ->
		h("div.sitelist", {key: @row.id, classes: {empty: @sites.length == 0}}, [
			h("h2", @row.title),
			h("div.sites", [
				@sites.map (item) ->
					item.render()
			])
		])

window.SiteList = SiteList