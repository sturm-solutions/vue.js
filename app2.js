var apiURL = 'https://api.github.com/repos/sturm-solutions/vue.js/commits?per_page=3&sha='

/**
 * Actual demo
 */

var demo = new Vue({

    el: '#demo',

    data: {
        branches: ['master'],
        currentBranch: 'master',
        commits: null
    },

    created: function () {
        this.fetchData()
    },

    watch: {
        currentBranch: 'fetchData'
    },

    filters: {
        truncate: function (v) {
            var newline = v.indexOf('\n')
            return newline > 0 ? v.slice(0, newline) : v
        },
        formatDate: function (v) {
            return v.replace(/T|Z/g, ' ')
        }
    },

    methods: {
        fetchData: function () {
            var xhr = new XMLHttpRequest()
            var that = this
            xhr.open('GET', apiURL + that.currentBranch)
            xhr.onload = function () {
                that.commits = JSON.parse(xhr.responseText)
                console.log(that.commits[0].html_url)
            }
            xhr.send()
        }
    }
})
