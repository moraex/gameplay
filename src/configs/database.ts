const DATABASE_NAME = '@gameplay';

//padrão para nomeação de coleções em um db
//@appname:collection_name
const COLLECTION_USERS = `${DATABASE_NAME}:user`;
const COLLECTION_APPOINTMENTS= `${DATABASE_NAME}:appointments`;

export {
    COLLECTION_USERS,
    COLLECTION_APPOINTMENTS
}