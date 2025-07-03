import {openDB} from 'idb'

const DB_NAME = 'form-db'


export const initdb = async ()=>{
    return openDB(DB_NAME, 1, {
        upgrade(db){
            if(!db.objectStoreNames.contains('user')){
                db.createObjectStore('user',{keyPath:'id',autoIncrement:true})
            }
        }
    })
}

export const saveOfflineData = async (data)=>{
    const db = await initdb()

    await db.add('user',data)
}

export const getOfflineData = async ()=>{
    const db  = await initdb()
    return db.getAll('user')
}

export const clearOfflineData = async ()=>{
    const db = await initdb()
    return db.clear('user')
}
