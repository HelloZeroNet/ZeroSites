class Form extends Class
	constructor: ->
		@hidden = false
		@attached = false
		@reset()
		return @

	reset: =>
		@data = {}
		@data_original = {}
		@inputs = {}
		@invalid = {}
		@nodes = {}
		@fields = []

	setData: (data) =>
		@data = data
		@data_original = JSON.parse(JSON.stringify(data))

	handleInput: (e) =>
		@data[e.target.name] = e.target.value
		@invalid[e.target.name] = false
		return false

	storeNode: (node) =>
		if node.attributes.for?.value
			@nodes[node.attributes.for.value + "-label"] = node
		else
			@nodes[node.attributes.name.value] = node

	addField: (type, id, title, props) =>
		if props.values and props.values.constructor == Array
			if props.values.length and props.values[0].constructor != Array
				props.values = ([key, key] for key in props.values)
		if props.values and props.values.constructor == Object
			props.values = ([key, val] for key, val of props.values)

		@fields.push({type: type, id: id, title: title, props: props})

	h: (tag, props, childs) =>
		@inputs[props.name] = [tag, props, childs]
		props.value ?= @data[props.name]
		props.id ?= props.name
		props.oninput ?= @handleInput
		props.afterCreate = @storeNode
		props.classes ?= {}
		if @invalid[props.name] or @invalid[props.for]
			props.classes.invalid = true
		else
			props.classes.invalid = false
		if @invalid[props.name]
			return [
				h(tag, props, childs),
				h("div.invalid-reason", {key: "reason-#{props.name}", enterAnimation: Animation.slideDown, exitAnimation: Animation.slideUp}, @invalid[props.name])
			]
		else
			return h(tag, props, childs)

	shouldBeZite: (value) =>
		if not value.match(/([A-Za-z0-9]{26,35}|[A-Za-z0-9\.-]{2,99}\.bit)/)
			return "Invalid site address: only ZeroNet addresses supported"

	validate: =>
		valid = true
		@invalid = {}
		for name, [tag, props, childs] of @inputs
			if props.required and not props.value
				@invalid[name] = "This field is required"
				Animation.shake(@nodes[props.name])
				valid = false
			else if props.validate
				if props.validate.constructor == Array
					for validate in props.validate
						field_error = validate(props.value)
						if field_error then break
				else
					field_error = props.validate(props.value)
				if field_error
					valid = false
					@invalid[name] = field_error

			else
				@invalid[name] = false

		Page.projector.scheduleRender()
		return valid

	handleCancelClick: =>
		@hidden = true
		for key, val of @data_original
			@data[key] = val
		Page.projector.scheduleRender()
		return false

	handleSubmitClick: =>
		if not @validate()
			return false
		@saveRow (res) =>
			if res == "ok"
				@hidden = true
				Page.projector.scheduleRender()
		return false

	handleDeleteClick: =>
		Page.cmd "wrapperConfirm", ["Are you sure you want to delete this item?", "Delete"], =>
			@deleteRow (res) =>
				if res == "ok"
					@hidden = true
					Page.projector.scheduleRender()
		return false

	handleRadioClick: (e) =>
		id = e.currentTarget.attributes.for.value
		@data[id] = e.currentTarget.value
		@invalid[id] = false
		Page.projector.scheduleRender()
		return false

	renderField: (field) =>
		props = field.props
		props.value = @data[field.id]
		props.name = field.id
		values = props.values
		if field.type == "radio"
			h("div.formfield",
				@h("label.title", {for: field.id}, field.title),
				@h("div.radiogroup", props, [
					values.map ([key, value]) =>
						[h("a.radio", {for: props.id, key: key, href: "#"+key, onclick: @handleRadioClick, value: key, classes: {active: @data[field.id] == key}}, value), " "]
				])
			)
		else
			h("div.formfield",
				@h("label.title", {for: field.id}, field.title),
				@h("input.text", props)
			)


	render: (classname="") =>
		h("div.form-takeover-container#FormEdit", {afterCreate: Animation.show, classes: {hidden: @hidden}}, [
			h("div.form.form-takeover#{classname}", {afterCreate: Animation.slideDown, exitAnimation: Animation.slideUp},
				@fields.map @renderField
				h("a.cancel.link", {href: "#Cancel", onclick: @handleCancelClick}, "Cancel")
				if @deleteRow then h("a.button.button-submit.button-outline", {href: "#Delete", onclick: @handleDeleteClick}, "Delete")
				h("a.button.button-submit", {href: "#Modify", onclick: @handleSubmitClick}, "Modify")
			)
		])

window.Form = Form