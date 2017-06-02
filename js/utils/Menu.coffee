class Menu
	constructor: ->
		@visible = false
		@items = []
		@node = null

	show: =>
		window.visible_menu?.hide()
		@visible = true
		window.visible_menu = @

	hide: =>
		@visible = false

	toggle: =>
		if @visible
			@hide()
		else
			@show()
		Page.projector.scheduleRender()


	addItem: (title, cb, selected=false) ->
		@items.push([title, cb, selected])


	storeNode: (node) =>
		@node = node
		# Animate visible
		if @visible
			node.className = node.className.replace("visible", "")
			setTimeout (->
				node.className += " visible"
			), 20

	handleClick: (e) =>
		keep_menu = true
		for item in @items
			[title, cb, selected] = item
			if title == e.target.textContent or e.target["data-title"] == title
				keep_menu = cb(item)
				break
		if keep_menu != true
			@hide()
		return false

	renderItem: (item) =>
		[title, cb, selected] = item
		if typeof(selected) == "function"
			selected = selected()
		if title == "---"
			h("div.menu-item-separator")
		else
			if typeof(cb) == "string"  # Url
				href = cb
				onclick = true
			else  # Callback
				href = "#"+title
				onclick = @handleClick
			if typeof(title) == "function"
				title = title()
				key = "#"
			else
				key = title
			h("a.menu-item", {href: href, onclick: onclick, "data-title": title, key: key, classes: {"selected": selected, "noaction": (cb == null)}}, title)

	render: (class_name="") =>
		if @visible or @node
			h("div.menu#{class_name}", {classes: {"visible": @visible}, afterCreate: @storeNode}, @items.map(@renderItem))

window.Menu = Menu

# Hide menu on outside click
document.body.addEventListener "mouseup", (e) ->
	if not window.visible_menu or not window.visible_menu.node
		return false
	isChildOf = (child, parent) ->
		node = child.parentNode
		while node != null
			if node == parent
				return true
			else
				node = node.parentNode
		return false
	if not isChildOf(e.target, window.visible_menu.node.parentNode) and not isChildOf(e.target, window.visible_menu.node)
		window.visible_menu.hide()
		Page.projector.scheduleRender()