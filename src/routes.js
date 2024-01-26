import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-params.js'
import { Database } from './database.js'

const database = new Database()
const timeStamp = new Date()
const formattedtimeStamp = timeStamp.toLocaleString("pt-BR", {
  timeZone:"America/Sao_Paulo"
})

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.query
      const tasks = database.select('tasks', (title || description) ? {
        title: title,
        description: description
      } : null)
      
      return res.end(JSON.stringify(tasks))
    }   
  },
  {
    method:"POST",
    path:buildRoutePath("/tasks"),
    handler: (req, res) => {
      const {title, description} = req.body
      const task = {
        id: randomUUID(),
        title,
        description,
        completedAt: null,
        createdAt:formattedtimeStamp,
        updatedAt: formattedtimeStamp
      }
      database.insert("tasks", task)
      
      return res.writeHead(201).end("Task adicionada com sucesso!")
    }
  },
    {
    method:"PUT",
    path:buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const {title, description} = req.body
      const { id } = req.params

      const [task] = database.select('tasks', {id})
      if (!task){
        return res.writeHead(404).end("Task não encontrada!")
      }

      if (!title && !description){
        return res.writeHead(400)
        .end("Título e descrição estão faltando para atualizar a task!")
      }

      if (!title || !description){
        if (!title){
          return res.writeHead(400)
          .end("O título é necessário para inserir a task, Insira-o e tente novamente.")
        } else {
          return res.writeHead(400)
          .end("A descrição é necessária para atualizar a task. Insira-a e tente novamente.")
        }
      }

      database.update('tasks', id, {
        title,
        description,
        updatedAt: formattedtimeStamp
      })

      return res.writeHead(200).end('Task atualizada com sucesso!')
    }
  },
  {
    method:'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) =>{
      const { id } = req.params

      const [task] = database.select('tasks', {id})

      if(!task){
        return res.writeHead(404)
        .end("A task informada não pode ser encontrada.")
      }

      database.delete('tasks', id)
      return res.writeHead(200).end("Task deletada com sucesso!")
    }
  },
  {
    method:'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) =>{
      const { id } = req.params

      const [task] = database.select('tasks', {id})

      if(!task){
        return res.writeHead(404)
        .end("A task informada não pode ser encontrada.")
      }

      const isTaskCompleted = !!task.completedAt
      const taskTitle = task.title
      const taskDescription = task.description
      const completedAt = isTaskCompleted ? null : formattedtimeStamp

      database.update('tasks', id, {
        completedAt, 
        title: taskTitle, 
        description:taskDescription, 
        updatedAt: formattedtimeStamp})
      return res.writeHead(204).end()
    }
  }
]