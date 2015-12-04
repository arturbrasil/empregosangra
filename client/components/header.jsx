Header = React.createClass({
  render() {
    return (
      <header className="main-header">
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <div className="text-center">
                <h1>
                  <a href="/"> Empregos Angra!</a>
                </h1>
                <p>Vagas de emprego em Angra dos Reis </p>
                <a className="button add-job" href="/jobs/add">Anuncie uma vaga</a>
                <a className="button browse-jobs" href="/">Ver Vagas</a>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
});
