import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import { DateTime } from 'luxon'
import { md5 } from 'js-md5';

export default class UsuariosController {
  public async index({}: HttpContextContract) {
    return Usuario.all()
  }


  public async store({request, response}: HttpContextContract) {
    const { nome, cpf, senha } = request.body()
    if (nome === undefined || cpf === undefined || senha === undefined) {
      return response.status(400)
    } else {
      const novoUsuario = { nome, cpf, senha } 
      const novaSenha = md5(senha)
      novoUsuario.senha = novaSenha
      Usuario.create(novoUsuario)
      return response.status(201).send(novoUsuario)
    }
  }

  public async show({params, response}: HttpContextContract) {
    const usuarioEncontrado = await Usuario.findByOrFail('id', params.id)
    if (usuarioEncontrado === undefined) {
      return response.status(404)
    } else {
      return response.status(201).send(usuarioEncontrado)
    }
  }

  public async update({params, request, response}: HttpContextContract) {
    const { nome, cpf, senha } = request.body()
    const usuarioEncontrado = await Usuario.findByOrFail('id', params.id)
    if (!usuarioEncontrado) {
      return response.status(404)
    } else {
      usuarioEncontrado.nome = nome
      usuarioEncontrado.cpf = cpf
      usuarioEncontrado.senha = senha
    }

    await usuarioEncontrado.save()
    await usuarioEncontrado.merge({ updatedAt: DateTime.local() }).save()
    return response.status(200).send(usuarioEncontrado)
  }

  public async destroy({params, response}: HttpContextContract) {
    const usuarioEncontrado = await Usuario.findByOrFail('id', params.id)
    if (!usuarioEncontrado) {
      return response.status(400)
    } else {
      usuarioEncontrado.delete()
      return response.status(204)
    }
    }
  }

