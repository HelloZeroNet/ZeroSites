class Form extends Class
	constructor: ->
		@reset()
		return @

	reset: =>
		@data = {}
		@inputs = {}
		@invalid = {}
		@nodes = {}

	handleInput: (e) =>
		@data[e.target.name] = e.target.value
		@invalid[e.target.name] = false
		return false

	storeNode: (node) =>
		if node.attributes.for?.value
			@nodes[node.attributes.for.value + "-label"] = node
		else
			@nodes[node.attributes.name.value] = node

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
				field_error = props.validate(props.value)
				if field_error
					valid = false
					@invalid[name] = field_error

			else
				@invalid[name] = false

		Page.projector.scheduleRender()
		return valid

window.Form = Form