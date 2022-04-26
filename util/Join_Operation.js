class Join_Operation {
    hasOne(first, second, foreignKey){
        return first.hasOne(second, {foreignKey: foreignKey})
    }
    belongsTo(first, second, foreignKey){
        return first.belongsTo(second, {foreignKey : foreignKey})
    }
}
module.exports = new Join_Operation();