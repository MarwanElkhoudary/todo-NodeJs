const addTask = require('../database/query/addTask');
const getTask = require('../database/query/getTasks');
const {
    getTokenData
} = require('./authentication/authinticate');
const deleteTask = require('../database/query/deleteTask')

exports.get = (req, res) => {
    getTokenData(req.cookies.data, (err, result) => {
        getTask(result.id, (errGetTask, resGetTask) => {
            if (errGetTask) {
                console.log('errGetTask', errGetTask)
            } else {
                console.log('resGetTask', resGetTask)
                res.render('home', {
                    title: 'To Do List',
                    css1: 'style/home.css',
                    name:result.name,
                    authenticated:true,
                    resGetTask,
                    result,
                });
            }
        })
    })
}

exports.post = (req, res) => {
    getTokenData(req.cookies.data, (err, result) => {
        const data = req.body;
        console.log('res.cookie.id', result)
        const user_id = result.id;
        const {
            title,
            task,
        } = data;
        if (data.title === '' && data.task === '') {
               res.redirect('/');
        }else{
            addTask(data, user_id, (errAddToDo, resAddToDo) => {
                if (errAddToDo) {
                    console.log('errAddToDo', errAddToDo)
                } else {}
                getTask(result.id, (errGetTask, resGetTask) => {
                    if (errGetTask) {
                        console.log('errGetTask', errGetTask)
                    } else {
                        res.render('home', {
                            title: 'To Do List',
                            css1: 'style/home.css',
                            name:result.name,
                            authenticated:true,
                            resGetTask
                        });

                    }
                })
            })

        }

    })
}


exports.delete = (req, res) => {
    const id = req.params.id;
    deleteTask(id, (errDelete, resDelete) => {
        if (errDelete) {
            console.log('delete')
            console.log('not delete', errDelete)
        } else {
            res.redirect('/')
        }
    })

}