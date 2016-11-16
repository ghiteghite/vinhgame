var Errors = {
  user: {
    username: {
      required: 'Username is required'
    },
    email: {
      required: 'Email is required',
      invalid: 'Invalid email'
    },
    usernameOrEmail: {
      required: 'Username or email is required',
      exists: 'Username or email is exists'
    },
    password: {
      required: 'Password is required',
      length: 'Password must great than or equal 6 letter',
      confirm: 'Password does not match'
    }
  }
}

module.exports = Errors;