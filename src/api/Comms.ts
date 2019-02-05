// TODO: haven't done real test
export class Comms {
    protected static postData(url = ``, data = {}) {
        return this.basic(url, {}, "POST");
    }

    protected static getData(url = ``) {
        return this.basic(url, {}, "GET");
    }

    private static basic(url = ``, data = {}, method=``):Promise<{}> {
        // Default options are marked with *
          return fetch(url, {
              method: method, // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, cors, *same-origin
              cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: "same-origin", // include, *same-origin, omit
              headers: {
                  "Content-Type": "application/json; charset=utf-8",
                  // "Content-Type": "application/x-www-form-urlencoded",
              },
              redirect: "follow", // manual, *follow, error
              referrer: "no-referrer", // no-referrer, *client
              body: JSON.stringify(data), // body data type must match "Content-Type" header
          })
          .then(response => response.json()) // parses response to JSON
    }
}
