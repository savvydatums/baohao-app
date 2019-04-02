export class Comms {

    protected static postFormData(url = ``, data = {}): Promise<{}> {

        const payload = new FormData();

        for ( let key in data) {
            payload.append(key, data[key]);
        }

        return fetch (url, {
            method: "POST",
            cache: "no-cache",
            referrer: "no-referrer",
            body: payload
        })
        .then(response => response.json())
    }

    protected static postJSONData(url = ``, data = {}): Promise<{}> {

        return fetch(url, {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                mode: "cors",
                referrer: "no-referrer",
                body: JSON.stringify(data)
            })
            .then(response => response.json())
    }

    // not test it yet
    protected static getData(url = ``) {
        return this.basic(url, {}, "GET");
    }


    // this change to form data
    private static basic(url = ``, data = {}, method=``):Promise<{}> {
          return fetch(url, {
              method: method,
              referrer: "no-referrer",
              body: data
          })
          .then(response => response.json()) // parses response to JSON
    }
}

export const ResponseStatus = {
    SUCCESS: 200,
    ERROR: 'error'
}

export const InsightResponseStatus = {
	SUCCESS : "ok",
	UPDATED : "updated"
}

export const LoggedInStatus = {
    'PENDING': 'PENDING', // status => inactive
    'PROCESSING': 'PROCESSING', // payment succees --> not collected
    'DENY': 'DENY', // => payment deny
    'APPROVED': 'APPROVED', // status => approved -> has data
}


// only for temp testing
export const temp_cookie = "testyuser_editor2|1550548435|S5yFfbHpv67XmLK1ppi5NdH5OxDVwc8XG4xjJVYMFMv|7f91426d37d9967b2ecbff22438ccf6c48420fad3a7936ab0901b7478487519a"