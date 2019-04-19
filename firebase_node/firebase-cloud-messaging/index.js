const admin = require('firebase-admin')
const { google } = require('googleapis')
const axios = require('axios')

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging'
const SCOPES = [MESSAGING_SCOPE]

const serviceAccount = require('./message-417cc-firebase-adminsdk-l8kvc-7eab81a1bf.json')
const databaseURL = 'https://message-417cc.firebaseio.com'
const URL =
  'https://fcm.googleapis.com/v1/projects/message-417cc/messages:send'
const deviceToken =
  'cNCm38lNxaM:APA91bEFQrQnWMnECiZsOGYvubadpdS2yDLFCVWiKlAqmEcLvjiu5pGTKV5X9hk_FWXPAgbxE_lEy-rs_xBTQoV68iMLzFGmoPRWXRZx8SN860hVVmh29jtQGeStH4gydwnZOr7HgW13'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
})

function getAccessToken() {
  return new Promise(function(resolve, reject) {
    var key = serviceAccount
    var jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    )
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        reject(err)
        return
      }
      resolve(tokens.access_token)
    })
  })
}

async function init() {
  const body = {
    message: {
      data: { key: 'value' },
      notification: {
        title: 'Notification title',
        body: 'Notification body'
      },
      webpush: {
        headers: {
          Urgency: 'high'
        },
        notification: {
          requireInteraction: 'true'
        }
      },
      token: deviceToken
    }
  }

  try {
    const accessToken = await getAccessToken()
    console.log('accessToken: ', accessToken)
    const { data } = await axios.post(URL, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    console.log('name: ', data.name)
  } catch (err) {
    console.log('err: ', err.message)
  }
}

init()