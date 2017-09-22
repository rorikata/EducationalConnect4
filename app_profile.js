new Vue({
    el: '#vue-app',
    data: {
        name: '',
        age: ''
    },
    methods: {
        add:function() {
          this.age++
        },
        sub:function() {
          this.age--
        }
    }
});
