import Model from "../models/bidQuick";

// function findAll() {
//     return Model.findAll();
// }

// function findOne(query) {
//     return Model.findOne({ where: query });
// }

// function create(query) {
//     return Model.create(query);
// }

// function findByQuery(query) {
//     return Model.findAll({ where: query });
// }

// function findById(id) {
//     return Model.findOne({ where: { id } });
// }

// // function to delete a record with id
// function deleteById(id) {
//     return Model.destroy({ where: { id } });
// }

function findAll() {
    return Model.findAll();
}

function findOne(query) {
    return Model.findOne(query);
}

function create(query) {
    return Model.create(query);
}

function findByQuery(query) {
    return Model.findAll({ where: { query } });
}

function findById(id) {
    return Model.findByPk(id)
}

function updateById(id: string, query: {}) {
    return Model.update(query, { where: { id } })
}

function updateByFilter(filter: {}, query: Partial<Document>) {
    return Model.update(query, { where: filter })
}

function deleteByFilter(filter: {}) {
    return Model.destroy(filter)
}

function deleteById(id) {
    return Model.destroy({ where: { id } })
}


export default { findAll, findOne, create, findByQuery, findById, deleteById, updateById, updateByFilter, deleteByFilter };
