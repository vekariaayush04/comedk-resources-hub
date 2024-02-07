const {atom} = require('recoil')

export const registerAtom = atom({
    key:"registerAtom",
    default:{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
})