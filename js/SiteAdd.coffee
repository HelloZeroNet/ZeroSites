class SiteAdd extends Class
	constructor: ->
		@form = new Form()
		@submitting = false
		return @

	handleRadioLangClick: (e) =>
		@form.data["language"] = e.currentTarget.value
		@form.invalid["language"] = false
		Page.projector.scheduleRender()
		return false

	handleRadioCategoryClick: (e) =>
		@form.data["category"] = e.currentTarget.value
		@form.invalid["category"] = false
		Page.projector.scheduleRender()
		return false

	handleSubmit: =>
		if not Page.site_info.cert_user_id
			Page.user.certSelect =>
				@handleSubmit()
			return false

		if not @form.validate()
			return false

		# Only keep site address
		@form.data["address"] = @form.data["address"].match(/([A-Za-z0-9]{26,35}|[A-Za-z0-9\.-]{2,99}\.bit)(.*)/)[0]

		@submitting = true

		Page.user.getData (data) =>
			row_site = @form.data
			row_site.date_added = Time.timestamp()
			row_site.site_id = row_site.date_added
			data.site.push(row_site)
			Page.user.save data, (res) =>
				if res == "ok"
					@close()
					Page.head.active = "new"
					setTimeout ( =>
						@submitting = false
						@form.reset()
						Page.site_lists.update()
					), 1000
				else
					@submitting = false

		return false

	close: =>
		Page.site_lists.state = null
		Page.projector.scheduleRender()

	render: ->
		h("div.form.form-siteadd", {updateAnimation: Animation.height, classes: {hidden: Page.site_lists.state != "siteadd"}}, [
			h("div.formfield",
				@form.h("label.title", {for: "address"}, "Address"),
				@form.h("input.text", {type: "text", name: "address", placeholder: "e.g. http://127.0.0.1:43110/1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8", required: true, validate: @form.shouldBeZite}),
			),
			h("div.formfield",
				@form.h("label.title", {for: "title"}, "Title"),
				@form.h("input.text", {type: "text", name: "title", placeholder: "e.g. ZeroBlog", required: true}),
			),
			h("div.formfield",
				@form.h("label.title", {for: "language"}, "Language"),
				@form.h("div.radiogroup.radiogroup-lang", {name: "language", value: @form.data.language, required: true}, [
					Page.languages.map (lang) =>
						[h("a.radio", {key: lang, href: "#"+lang, onclick: @handleRadioLangClick, value: lang, classes: {active: @form.data.language == lang}}, lang), " "]
					# h("a.radio", {key: "multi", href: "#multi", onclick: @handleRadioLangClick, value: "multi", classes: {active: @form.data.language == "multi"}}, "multi")
				])
			),
			h("div.formfield",
				@form.h("label.title", {for: "category"}, "Category"),
				@form.h("div.radiogroup", {name: "category", value: @form.data.category, required: true}, Page.categories.map ([id, category]) =>
					[h("a.radio", {key: id, href: "#"+id, onclick: @handleRadioCategoryClick, value: id, classes: {active: @form.data.category == id}}, category), " "]
				)
			),
			h("div.formfield",
				@form.h("label.title", {for: "description"}, "Description"),
				@form.h("input.text", {type: "text", name: "description", placeholder: "e.g. ZeroNet changelog and related informations", required: true}),
			),
			h("a.button.button-submit", {href: "#Submit", onclick: @handleSubmit}, "Submit")
		])

window.SiteAdd = SiteAdd