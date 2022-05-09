import JWT from 'jsonwebtoken';

export const signAccessToken = {
    signAccessToken :(email)=>{
        return new Promise((resolve,reject)=>{
            const payload = {
            }
            const secret= process?.env?.ACCESS_TOKEN_SECRECT
            const options: any = {
                expiresIn: "1h",
                issuer:"test.com.site",
                audience:email,
            }

            JWT.sign(payload,secret,options,(error,token)=>{
                if(error){
                    reject(error)
                }
                resolve(token)
            })
        })
    },

    verifyAccessToken : (request,response,next)=>{
        if(!request.headers['authorization']) return next('TokenError')
        const headers = request.headers['authorization']
        const headersArray = headers.split(' ')
        const token = headersArray[1]
        JWT.verify(token,process.env.ACCESS_TOKEN_SECRECT,(error,payload)=>{
            if(error) {
                if(error.name === 'JsonWebTokenError') return next('TokenError')
                return next("tokenError")
            }
            request.payload = payload
            next()
        })
    },
}