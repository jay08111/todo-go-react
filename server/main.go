package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

const (
	port string = ":4000"
)

type Todo struct {
	Id    int    `json:"id"`
	Done  bool   `json:"done"`
	Title string `json:"title"`
	Body  string `json:"body"`
}

func main() {
	e := echo.New()

	todoList := make([]*Todo, 0)

	e.GET("/api/todo", func(c echo.Context) error {
		bodyJson := c.JSON(http.StatusOK, todoList)

		if err := bodyJson; err != nil {
			return err
		}

		return bodyJson
	})

	e.POST("/api/todo", func(c echo.Context) error {
		bodyJson := &Todo{}

		if err := c.Bind(bodyJson); err != nil {
			return c.String(http.StatusBadRequest, "bad request")
		}

		bodyJson.Id = len(todoList) + 1

		todoList = append(todoList, *&bodyJson)
		return c.JSON(http.StatusOK, todoList)
	})

	e.PATCH("/api/todo/:id/done", func(c echo.Context) error {
		id, _ := strconv.Atoi(c.Param("id"))

		for idx, v := range todoList {
			if v.Id == id {
				todoList[idx].Done = true
			}
		}

		return c.JSON(http.StatusOK, todoList)
	})

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
	}))

	e.Logger.Fatal(e.Start(port))
}
