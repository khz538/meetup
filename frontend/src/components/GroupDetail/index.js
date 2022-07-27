import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroupById } from '../../store/groups';

export default function GroupDetail() {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const group = useSelector(state => state.groups.group);
    // const user = useSelector(state => state.session.user);
    // console.log('++++++++', group);

    // const isOrganizer = user?.id === group?.organizerId;
    // async function getDetail(groupId) {
    //     const getGroup = await dispatch(getGroupById(groupId));
    //     const getMembers = await dispatch(getGroupMembers(groupId));
    // }

    useEffect(() => {
        dispatch(getGroupById(groupId));
    }, [dispatch]);

    if (!group) return null;
    if (!group.Organizer) return null;

    return (
        <div className='group-detail-page'>
            <div className='group-detail-upper'>
                <img src={group.previewImage} alt='group-image' className='group-image'></img>
                <div>
                    <h1>{group.name}</h1>
                    <p>{group.numMembers} member(s)</p>
                    <p>Owner: {group.Organizer.firstName}</p>
                    <p>{group.city}, {group.state}</p>
                    <button>Join This Group</button>
                </div>
            </div>
            <div className='group-detail-lower'>
                <div className='group-about-section'>
                    <h3>What we're about</h3>
                    <p>{group.about}</p>
                </div>
                <div className='members'>
                    <h3>Organizer</h3>
                    <p>{group.Organizer.firstName} {group.Organizer.lastName}</p>
                    <h3>Members</h3>
                    {group.Members.map(member => <p>{member.firstName} {member.lastName}</p>)}
                </div>
            </div>
        </div>
    );
};