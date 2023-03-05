package main

import (
	"log"
	"net/http"
	"strconv"

	"database/sql"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	_ "github.com/go-sql-driver/mysql"
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
	db, err := sql.Open("mysql", "root:9036@tcp(127.0.0.1:3306)/<스키마>")

	if err != nil {
		log.Fatal(err)
	}
	db.Close() // 3
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

	e.POST("/api/todo/:id/done", func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.String(http.StatusBadRequest, "invalid id")
		}

		for idx, v := range todoList {
			if v.Id == id {
				todoList[idx].Done = !todoList[idx].Done
			}
		}

		return c.JSON(http.StatusOK, todoList)
	})

	e.DELETE("/api/todo/:id", func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.String(http.StatusBadRequest, "invalid id")
		}

		for idx, v := range todoList {
			if v.Id == id {
				todoList = append(todoList[:idx], todoList[idx+1:]...)
			}
		}

		return c.JSON(http.StatusOK, todoList)
	})

	e.DELETE("/api/todo", func(c echo.Context) error {
		todoList = nil
		return c.JSON(http.StatusOK, todoList)
	})

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
	}))

	e.Logger.Fatal(e.Start(port))
}
