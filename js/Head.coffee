class Head
	constructor: ->
		@active = "popular"

	handleMenuClick: (e) =>
		@active = e.currentTarget.attributes.name.value
		Page.site_lists.update()
		return false

	render: =>
		h("div#Head", [
			h("a.logo", {href: "?Home", onclick: Page.handleLinkClick}, [
				h("img", {"src": "img/logo.png", "width": 58, "height": 64}),
				h("h1", "ZeroSites"),
				# h("h2", "Sites created by ZeroNet community")
			]),
			h("div.order", [
				h("a.order-item.popular", {href: "#", name: "popular", classes: {active: @active == "popular"}, onclick: @handleMenuClick}, "Popular"),
				h("a.order-item.new", {href: "#", name: "new", classes: {active: @active == "new"}, onclick: @handleMenuClick}, "New")
			])
		])

window.Head = Head