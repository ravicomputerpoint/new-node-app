const express = require('express')
const router = express.Router()
const Student = require('../models/Student.model')

//Home - Total Students Count
router.get('/',(req, res) => {
   Student.count((error, rows) => {
    if(error) return res.send(res.message)
    const total_students = rows[0].total
    return res.render('index',{total_students})
   })
})

// List all students
router.get('/students', (req, res) => {
    Student.all((error, students) => {
        if(error) return res.send(error.message)
        res.render('students/index',{students})
    })
})

// Show create form
router.get('/students/create', (req, res) => {
    res.render('students/create')
})

// Store student
router.post('/store', (req, res) => {
    Student.create(req.body,(error) => {
        if(error) return res.send(error.message)
        res.redirect('/students')
    })
})

// Edit form
router.get('/students/edit/:id', (req, res) => {
    Student.find(req.params.id,(error, student) => {
        if (error) return res.send(error.message)
        res.render('students/edit',{student})
    })
})

// Update student
router.post('/update/:id', (req, res) => {
    Student.update(req.params.id,req.body,(error) => {
        if(error) return res.send(error.message)
        res.redirect('/students')
    })
})

// Delete student
router.get('/students/delete/:id', (req, res) => {
    Student.delete(req.params.id,(error) => {
        if(error) return res.send(error.message)
        res.redirect('/students')
    })
})

module.exports = router