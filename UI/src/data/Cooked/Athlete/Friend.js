import Avatar from '../../../UiComponents/Avatar'

export default class Friend {
    constructor(rawData) {
        this.id = rawData.id
        this.firstName = rawData.firstname
        this.lastName = rawData.lastname
        this.profileImageUrl = rawData.profile_medium === 'avatar/athlete/medium.png' ? 'defaultAvatar.png' : rawData.profile_medium
    }

    toTableDisplay() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            avatar: (
                <Avatar url={this.profileImageUrl}/>
            )
        }
    }
}