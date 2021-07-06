const loadApp = new Vue({
	el: "#loadApp",
	data: {
		hidden: true
	},
	methods: {
		show: function() {
			this.hidden = false;
			this.$nextTick(() => {
				this.$el.style.opacity = "1";
			});
		},
		hide: function() {
			this.hidden = true;
		}
	}
});

module.exports = loadApp;