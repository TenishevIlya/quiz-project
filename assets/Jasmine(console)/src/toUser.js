let toUser = (item, birthday) => {
	return {
    name: `${item.first_name} ${item.last_name}`,
    birthday
	}
}

module.exports = toUser;