const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        recipes: [Recipe]
        list: [Recipe]
    }

    type Recipe {
        _id: ID
        name: String
        description: String
        image: String
        ingredients: [Ingredient]
        user: User!
    }
        
    type Ingredient {
        _id: ID
        ingredientName: String
        amount: Float
    }

    input IngredientInput {
        ingredientName: String
        amount: Float
      }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        getUser(id: ID!): User
        getUsers: [User]
        getRecipe(id: ID!): Recipe
        getRecipes: [Recipe]
        getUserList: [Recipe]
        getUserRecipes(userId: ID!): [Recipe]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
        deleteUser(id: ID!): User
        addRecipe(name: String!, description: String, image: String, ingredients: [IngredientInput]!): Recipe
        updateList(recipeId: ID!): Recipe
    }


`;

module.exports = typeDefs;
