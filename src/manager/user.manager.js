// import fs from 'fs/promises'
import mongoose from 'mongoose'
import { User } from '../entities/user.js'
import { schemaUsers } from './models/schemaUsers.js'

export class UsersManager {
    #usersDb;
    constructor() {
        this.#usersDb = mongoose.model('users', schemaUsers)
    }
    async getUsers() {
        try {
            const allUsers = await this.#usersDb.find().lean()
            return allUsers
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
    async addUser(user) {
        if (!user.username || !user.password) {
            throw new Error('Todos los campos son requeridos.')
        } else {
            const allUsers = await this.getUsers();
            const newUser = new User(user)
            if (allUsers.find(user => user.username === newUser.username)) {
                throw new Error('Este usuario ya existe')
            } else {
                const result = await this.#usersDb.create(newUser)
                return result
            }
        }
    }
    async findUserByUsername(username) {
        try {
            const user = await this.#usersDb.findOne({ username })
            return user || null
        } catch (error) {
            throw error
        }
    }
    async addBetToUser({ username, tournamentId, matchId, predValues }) {
        // console.log(username);
        try {
            const user = await this.findUserByUsername(username)
            // console.log(user);
            if (user) {
                if (user.saldo > 0) {
                    await this.#usersDb.findOneAndUpdate(
                        { username: username },
                        { $inc: { "saldo": -1 } },
                        { returnOriginal: false }
                    ).then(async (result) => {
                        if (result) {
                            await this.#usersDb.findOneAndUpdate(
                                { "username": username },
                                {
                                    $set: {
                                        [`matchs.${tournamentId}.${matchId}`]: {
                                            puntajePredicted1: String(predValues.puntajePredicted1),
                                            puntajePredicted2: String(predValues.puntajePredicted2)
                                        }
                                    }
                                }, { returnOriginal: false }
                            )
                        }
                        console.log('Bet ingresado correctamente');
                    }).catch((error) => {
                        return { error: "No se pudo ingresar la bet" }
                    })

                    const updatedUser = await this.findUserByUsername(username)
                    return updatedUser
                } else {
                    console.log('No hay saldo suficiente');
                    return { error: "No hay saldo suficiente" }
                }
            } else {
                return { error: "El usuario no existe" }
            }

        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
    async getAllUsersPredictions() {
        const allUsers = await this.getUsers()
        const allUsersPredictions = []
        allUsers.forEach((user) => {
            allUsersPredictions.push({
                username: user.username, matchs: user.matchs, predictionsCorrects: user.predictionsCorrects, predictionsIncorrects: user.predictionsIncorrects
            })
        });
        return allUsersPredictions
    }
    async setUserCorrectPredictions({ username, correctPredictions, incorrectPredictions }) {
        try {
            const user = await this.#usersDb.findOneAndUpdate(
                { username: username },
                { $set: { predictionsCorrects: correctPredictions, predictionsIncorrects: incorrectPredictions } },
                { upsert: true, new: true }
            );
        } catch (error) {
            console.error(error);
        }
    }


    // async updateProduct(id, newProps) {
    //     const allProducts = await this.getProducts();
    //     const productIndex = allProducts.findIndex(product => product.id === id);
    //     if (productIndex !== -1) {
    //         allProducts[productIndex] = { ...allProducts[productIndex], ...newProps, ...{ "id": id } };
    //         await fs.writeFile(this.path, JSON.stringify(allProducts, null, 2))
    //         console.log('Changes has been changed succesfully');
    //         return allProducts[productIndex];
    //     } else {
    //         throw new Error('This product does not exist');
    //     }
    // }
    // async deleteProduct(id) {
    //     const allProducts = await this.getProducts();
    //     const productIndex = allProducts.findIndex(product => product.id === id);
    //     if (productIndex !== -1) {
    //         const deletedProduct = allProducts[productIndex];
    //         allProducts.splice(productIndex, 1);
    //         await fs.writeFile(this.path, JSON.stringify(allProducts, null, 2))
    //         console.log('This product has been deleted');
    //         return deletedProduct;
    //     } else {
    //         throw new Error('This product does not exist');
    //     }
    // }
}
