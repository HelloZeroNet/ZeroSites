class Site
	constructor: (@row) ->
		@form_edit = null
		@

	getUri: =>
		return @row.directory + "_" + @row.site_id

	isNew: =>
		return Time.timestamp() - @row.date_added < 60*60*24

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

	saveRow: (cb) =>
		Page.user.getData (data) =>
			data_row = row for row in data.site when row.site_id == @row.site_id
			for key, val of @row
				if data_row[key]
					data_row[key] = val
			Page.user.save data, (res) =>
				Page.site_lists.update()
				cb?(res)

	deleteRow: (cb) =>
		Page.user.getData (data) =>
			data_row_i = i for row, i in data.site when row.site_id == @row.site_id
			data.site.splice(data_row_i, 1)
			Page.user.save data, (res) =>
				Page.site_lists.update()
				cb?(res)

	handleEditClick: =>
		if not @form_edit
			@form_edit = new Form()
			@form_edit.addField("text", "address", "Address", {placeholder: "e.g. http://127.0.0.1:43110/1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8", required: true, validate: @form_edit.shouldBeZite})
			@form_edit.addField("text", "title", "Title", {placeholder: "e.g. ZeroBlog", required: true})
			@form_edit.addField("radio", "language", "Language", {required: true, values: Page.languages, classes: {"radiogroup-lang": true}})
			@form_edit.addField("radio", "category", "Category", {required: true, values: Page.categories})
			@form_edit.addField("text", "description", "Description", {placeholder: "e.g. ZeroNet changelog and related informations", required: true})
		@form_edit.setData(@row)
		@form_edit.saveRow = @saveRow
		@form_edit.deleteRow = @deleteRow
		Page.setFormEdit(@form_edit)
		return false

	render: =>
		h("a.site.nocomment", { href: Text.fixLink("http://127.0.0.1:43110/"+@row.address), key: @row.site_id, enterAnimation: Animation.slideDown, exitAnimation: Animation.slideUp, classes: @getClasses()}, [
			h("div.right", [
				h("a.star", {href: "#Star", onclick: @handleStarClick},
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
			if @isNew() then h("div.tag.tag-new", "New"),
			if @row.tags?.indexOf("popular") >= 0 then h("div.tag.tag-popular", "Popular"),
			if @row.cert_user_id == Page.site_info.cert_user_id then h("a.tag.tag-my", {href: "#Edit", onclick: @handleEditClick}, "Edit"),
			h("div.description", @row.description)
		])

window.Site = Site