import React from 'react'
import CMS from 'netlify-cms-app'

//Netlify CMS Components must be Class Components

export class NextStepControl extends React.Component {
    render() {
        const SelectControl = CMS.getWidget('select').control;
        const selectProps = { ...this.props };

        const steps = selectProps.entry.get('data').get('steps')
        if (steps.size > 0) {
            const options = steps.map(step => {
                return {
                    label: step.get('label'),
                    value: step.get('key'),
                }
            })

            selectProps.field = selectProps.field.set('options', options)

            return (
                <SelectControl {...selectProps} />
            );
        }

        return (
            <div className={this.props.classWrapper}>
                <p>No steps found. We suggest creating all your steps first, saving your changes, and then adding the options.</p>
            </div>
        )
    }
}
