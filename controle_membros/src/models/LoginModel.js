const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const LoginSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    }
})

const LoginModel = mongoose.model('usuário', LoginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.user = null;
        this.errors = [];
    }

    async userExist(){
        const user = await LoginModel.findOne({email: this.body.email});
        if(user){
            this.errors.push('Usuário já exite.')
        }
    }

    async register(){
        if(this.errors.length > 0) return;

        await this.userExist();
        
        if(this.errors.length > 0) return;
        
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async login(){
        if(this.errors.length > 0) return;

        this.user = await LoginModel.findOne({email: this.body.email});

        if(!this.user){
            this.errors.push('Usuário não existe.');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Usuário ou senha inválido');
            this.user = null;
            return;
        }
    }
}

module.exports = Login;