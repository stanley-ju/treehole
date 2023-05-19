axios.defaults.baseURL = 'http://localhost:8080/'

var qs = Qs
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

function create_stu (studentNumber,department) {
    return new Promise((resolve,reject) => {
        axios.post('user/register',qs.stringify({
            studentNumber:studentNumber,
            department:department
        })).then(response => {
            console.log(response)
            resolve("done")
        }).catch(error => {
            reject(error)
        })
    })
}
