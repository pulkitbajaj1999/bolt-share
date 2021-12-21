const path = require('path')
require('dotenv').config()
const express = require('express')
const router = express.Router()

const File = require('../models/file')

// get file-info page
router.get('/:uuid', async (req, res, next) => {
  try {
    const file = await File.findOne({
      uuid: req.params.uuid,
    })
    if (!file) {
      return res.render('download', {
        error: 'Link Expired!',
      })
    }
    return res.render('download', {
      fileName: file.filename,
      fileSize: file.size,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    })
  } catch (err) {
    return res.render('download', {
      error: 'Something went wrong!',
    })
  }
})

// download file
router.get('/download/:uuid', async (req, res, next) => {
  const file = await File.findOne({
    uuid: req.params.uuid,
  })
  if (!file) {
    return res.render('download', { error: 'Link Expired!' })
  }
  const filePath = path.join(__dirname, '..', file.path)
  return res.download(filePath)
})

module.exports = router
