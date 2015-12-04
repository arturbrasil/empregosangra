JobForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  componentWillReceiveProps(nextProps) {
    let job = nextProps.job;
    let identifier = nextProps.identifier;
    this.setState({ identifier: identifier, title: job.title, description: job.description, email: job.email, company: job.company, homepage: job.homepage });
  },

  getInitialState() {
    return {
      identifier: '',
      title: '',
      description: '',
      email: '',
      company: '',
      homepage: '',
      submitErrors: {}
    };
  },

  errorMessage (field) {
    return this.state.submitErrors[field];
  },

  errorClass(field) {
    return !!this.state.submitErrors[field] ? 'has-error' : '';
  },

  onSubmit(event) {
    event.preventDefault();

    var job = {
      title: this.state.title,
      description: this.state.description,
      email: this.state.email,
      company: this.state.company,
      homepage: 'http://' + this.state.homepage 
    };

    var errors = {};
    if (!job.title) {
      errors.title = 'O Título não pode estar em branco';
    }
    if (!job.description) {
      errors.description = 'A Descrição não pode estar em branco';
    }
    if (!job.email) {
      errors.email = 'E-Mail não pode estar em branco';
    }
    if (!job.title || !job.description || !job.email ) {
      return this.setState({submitErrors: errors});
    } else {
      if (this.props.action === 'add') {
        Meteor.call('jobs.add', job, (error) => {
          if (error) {
            sAlert.error(error.reason);
          } else {
            FlowRouter.go('/');
          }
        });
      } else {
        Meteor.call('jobs.update', this.state.identifier, job, (error) => {
          if (error) {
            sAlert.error(error.reason);
          } else {
            FlowRouter.go('/');
          }
        });
      }
    }
  },

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="six columns offset-by-three">
              <div className="alert info">
                <b>Note:</b> Por favor anuncie somente vagas de emprego. Anúncios e Spam serão removidos.
              </div>
              {this.props.action === 'add' ? (
                <div className="alert info">
                  <b>Um email com o link de ativação será enviado ao seu email! Para ativar a vaga vá até o seu email e clique em ativar !!!</b>
                </div>
              ) : null}
              <form className="add-update-job" onSubmit={this.onSubmit}>
                <label htmlFor="title">Título</label>
                <input type="text" className={"u-full-width " + this.errorClass('title')} placeholder="Título da Vaga" valueLink={this.linkState('title')}/>
                <div className="help-block">{this.errorMessage('title')}</div>
                <label htmlFor="description">Descrição</label>
                <textarea className={"u-full-width " + this.errorClass('description')} rows="20" placeholder="Descrição da Vaga" valueLink={this.linkState('description')}></textarea>
                <div className="help-block">{this.errorMessage('description')}</div>
                <label htmlFor="email">E-Mail</label>
                <input type="email" className={"u-full-width " + this.errorClass('email')} placeholder="E-Mail" valueLink={this.linkState('email')}/>
                <div className="help-block">{this.errorMessage('email')}</div>
                <label htmlFor="company">Empresa (optional)</label>
                <input type="text" className="u-full-width" placeholder="Empresa (Opcional)" valueLink={this.linkState('company')}/>
                <label htmlFor="homepage">Site da vaga (optional)</label>
                <input type="text" className="u-full-width" placeholder="Site da vaga (optional)" valueLink={this.linkState('homepage')}/>
                <input type="submit" className="button button-primary u-full-width" value="Anunciar"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
