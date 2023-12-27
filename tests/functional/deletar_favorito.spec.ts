import { test } from '@japa/runner'

test.group('Excluir favorito', () => {
  test('deletar pelo id', async ({ client }) => {
    const respota = await client.delete('/favoritos/7')
    respota.assertStatus(204)
  })

  test('deletar favorito que não existe', async ({ client }) => {
    const respota = await client.delete('/favoritos/777')
    respota.assertStatus(404)
  })
})