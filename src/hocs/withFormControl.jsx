import React, {Fragment} from 'react';

export default function withFormControl(Component) {
    return class PP extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                controlMode: 'read',
                textVal: props.text || ''
            };

            this.text = React.createRef();
            this.comment = React.createRef();

            this.turnOnEditMode = this.turnOnEditMode.bind(this);
            this.turnOffEditMode = this.turnOffEditMode.bind(this);
            this.submitChanges = this.submitChanges.bind(this);
            this.onChangeTextArea = this.onChangeTextArea.bind(this);
        }

        turnOnEditMode() {
            this.setState({
                controlMode: 'edit'
            })
        }

        turnOffEditMode() {
            this.setState({
                controlMode: 'read'
            })
        }

        submitChanges() {
            this.setState({
                controlMode: 'read'
            })
            this.props.submit({
                text: this.text.current.value,
                comment: this.comment.current.value
            })
        }

        onChangeTextArea(e) {
            this.setState({
                textVal: e.target.value
            })
        }

        render() {
            return <Fragment>
                <div className="card-body">
                    <Component {...this.props} controlMode={this.state.controlMode}/>
                    {this.state.controlMode === 'edit' && <form>
                        <div className="form-group">
                            <textarea ref={this.text}
                                      className="form-control"
                                      rows="3"
                                      value={this.state.textVal} onChange={this.onChangeTextArea}></textarea>
                        </div>
                        <div className="form-group">
                            <input ref={this.comment} type="text" className="form-control" placeholder="Left comment"/>
                        </div>
                    </form>}
                </div>
                <footer className="card-footer bg-transparent">
                    {this.state.controlMode !== 'edit'
                        ? <div className="button-edit">
                            <a className="btn btn-light"
                            onClick={this.turnOnEditMode}>Edit</a>
                        </div>
                        : <div className="button-control">
                            <a className="btn btn-light"
                               onClick={this.submitChanges}>Ok</a>
                            <a className="btn btn-light"
                               onClick={this.turnOffEditMode}>Cancel</a>
                        </div>}
                </footer>
            </Fragment>
        }
    }
}