package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Todo struct {
	Id    int    `json:"id"`
	Done  bool   `json:"done"`
	Title string `json:"title"`
	Body  string `json:"body"`
}

func main() {
	fmt.Println("hello world!")
	e := echo.New()

	e.GET("/todo", func(ctx echo.Context) error {
		return ctx.String(http.StatusOK, "Hello, World!")
	})

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
	}))

	e.Logger.Fatal(e.Start(":4000"))
}

func GetTodo(c echo.Context) {
}
