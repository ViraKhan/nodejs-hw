import { Schema, model } from "mongoose";

const userSchema = new Schema ({
    username: {type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true},
    password: { type: String, required: true, minlength: 8 },
},
 {timestamps: true },
);
// хук pre('save'), щоб за замовчуванням встановлювати username таким самим, як email, при створенні користувача.
userSchema.pre("save", function (next) {
    if (!this.username) {
        this.username = this.email;
    }

    next();
});
//  метод toJSON, щоб видаляти пароль із об'єкта користувача перед відправкою у відповідь
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};


export const User = model("User", userSchema);

