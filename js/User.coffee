class User extends Class
	constructor: (auth_address) ->
		@starred = {}
		if auth_address
			@setAuthAddress(auth_address)

	setAuthAddress: (auth_address) ->
		@auth_address = auth_address
		@updateStarred()

	updateStarred: (cb) ->
		@starred = {}
		Page.cmd "dbQuery", ["SELECT site_star.* FROM json LEFT JOIN site_star USING (json_id) WHERE ?", {directory: "#{@auth_address}"}], (res) =>
			for row in res
				@starred[row["site_uri"]] = true
			cb?()
			Page.projector.scheduleRender()

	getPath: ->
		return "data/users/#{@auth_address}"

	getDefaultData: ->
		return {
			"site": [],
			"site_star": {},
			"site_comment": []
		}

	getData: (cb) ->
		Page.cmd "fileGet", [@getPath()+"/data.json", false], (data) =>
			data = JSON.parse(data)
			data ?= @getDefaultData()
			cb(data)

	certSelect: (cb) =>
		Page.cmd "certSelect", {"accepted_domains": ["zeroid.bit"]}, (res) =>
			@log "certSelected"
			cb?(res)

	onSiteInfo: (site_info) =>
		if site_info.event?[0] == "cert_changed"
			@setAuthAddress(site_info.auth_address)
			Page.projector.scheduleRender()

	save: (data, cb) ->
		Page.cmd "fileWrite", [@getPath()+"/data.json", Text.fileEncode(data)], (res_write) =>
			Page.cmd "siteSign", {"inner_path": @getPath()+"/data.json"}, (res_sign) =>
				cb?(res_sign)
				Page.cmd "sitePublish", {"inner_path": @getPath()+"/content.json", sign: false}, (res_publish) =>
					@log "Save result", res_write, res_sign, res_publish

window.User = User