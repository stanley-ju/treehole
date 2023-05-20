package main

import (
	"backend/controller"

	"github.com/gin-gonic/gin"
)

//解决跨域问题
func Core() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token,Authorization,Token")
		c.Header("Access-Control-Allow-Methods", "POST,GET,OPTIONS")
		c.Header("Access-Control-Expose-Headers", "Content-Length,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Content-Type")
		c.Header("Access-Control-Allow-Credentials", "True")

		//处理请求
		c.Next()
	}
}

func CollectRoute(env *gin.Engine) *gin.Engine {
	env.Use(Core())
	env.POST("/user/signup", controller.Register)
	env.POST("/user/login", controller.Login)

	return env
}
