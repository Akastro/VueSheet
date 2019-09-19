import Vue from 'vue'
import axios from 'axios'


new Vue({
    el: '#root',
    data: {
        people: {},
        id: '',
        firstName: '',
        lastName: ''
    },

    mounted() {
        let _self = this

        axios.get('https://sheetdb.io/api/v1/cf21i8whxl080').then((response) => {
            console.log(response)
            _self.people = response
        })

        axios.get('https://sheetdb.io/api/v1/cf21i8whxl080/count').then((response) => {
            _self.id = response.data.rows
        })
    },

    methods: {
        addPerson() {
            this.id += 1;

            let person = {
                id: this.id,
                first_name: this.firstName,
                last_name: this.lastName
            }

            let savePerson = {
                data: [
                    person
                ]
            }

            this.people.data.push(person)

            axios.post('https://sheetdb.io/api/v1/cf21i8whxl080', savePerson)
        },

        deletePerson(person){

            let personIndex = this.people.data.indexOf(person)
            this.people.data.splice(personIndex, 1)

            axios.delete('https://sheetdb.io/api/v1/cf21i8whxl080/id/' + person.id)
        }
    }
})

