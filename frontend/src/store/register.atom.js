import {atom} from 'recoil'

export const registerAtom = atom({
    key:"registerAtom",
    default:{
        username: '',
        email: '',
        password: ''
      }
})


