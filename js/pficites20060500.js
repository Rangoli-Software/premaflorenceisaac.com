const citeFolks = {
    list: [
        {id: '', IG: '', FB: '', url: '', text: ''},
    ],
    getCite(id) {
        for (var i = 0; i < this.list.length; i++) {
            if ( list[i].id == id ) {
                return list[i];
            }
        }
        return null;
    }
};
