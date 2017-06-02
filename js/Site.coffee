class Site
	constructor: (@row) ->
		@

	getUri: =>
		return @row.directory + "_" + @row.site_id

	handleStarClick: =>
		if not Page.site_info.cert_user_id
			Page.user.certSelect =>
				@handleStarClick()
			return false

		if Page.user.starred[@getUri()]
			action = "removing"
		else
			action = "adding"

		Page.user.starred[@getUri()] = not Page.user.starred[@getUri()]
		Page.projector.scheduleRender()

		Page.user.getData (data) =>
			if action == "adding"
				data.site_star[@getUri()] = 1
			else
				delete data.site_star[@getUri()]
			Page.user.save data, (res) =>
				Page.site_lists.update()
		return false

	getClasses: =>
		return {
			my: @row.cert_user_id == Page.site_info.cert_user_id
			starred: Page.user.starred[@getUri()]
		}

	render: =>
		h("a.site.nocomment", { href: Text.fixLink("http://127.0.0.1:43110/"+@row.address), key: @row.site_id, enterAnimation: Animation.slideDown, exitAnimation: Animation.slideUp, classes: @getClasses()}, [
			h("div.right", [
				h("a.star", {href: "#", onclick: @handleStarClick},
					h("span.num", @row.star or "")
					h("span.icon.icon-star", "")
				),
				h("a.comments", {href: "#"},
					h("span.num", "soon")
					h("span.icon.icon-comment", "")
				),
				if @row.peers then h("div.peers",
					h("span.num", @row.peers)
					h("span.icon.icon-profile", "")
				)
			])
			h("div.title", @row.title),
			if @row.tags?.indexOf("new") >= 0 then h("div.tag.tag-new", "New"),
			if @row.tags?.indexOf("popular") >= 0 then h("div.tag.tag-popular", "Popular"),
			if @row.cert_user_id == Page.site_info.cert_user_id then h("div.tag.tag-my", "My"),
			h("div.description", @row.description)
		])

window.Site = Site