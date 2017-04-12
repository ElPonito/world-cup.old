import Avatar from '../../../UiComponents/Avatar'

export default class Friend {
    constructor(rawData) {
        this.firstName = rawData.firstname
        this.lastName = rawData.lastname
        this.profileImageUrl = rawData.profile_medium === 'avatar/athlete/medium.png' ? 'defaultAvatar.png' : rawData.profile_medium
    }

    toTableDisplay() {
        return [
            {
                content: (
                    <Avatar url={this.profileImageUrl}/>
                )
            },
            {content: this.firstName},
            {content: this.lastName}
        ]
    }
}