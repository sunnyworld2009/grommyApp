<View style={{ paddingLeft: 15, borderBottomWidth: 0.3, flex: 1, flexDirection: 'row', borderBottomColor: 'grey' }}>
<View style={{ flex: 0.5,  justifyContent: 'center' }}>
<Text style={{ color: '#575757' }}>Driver Status</Text>
</View>
<View style={{ flex: 0.5}}>
<Picker
supportedOrientations={['portrait','landscape']}
iosHeader="Select one"
headerBackButtonText="Go Back"
mode="dropdown"
style={{color: '#575757' }}
itemStyle={{color: '#575757'}}
placeholder="Driver Available"
selectedValue={this.state.driverAvailable}
onValueChange={this.onValueChange.bind(this)}>
<Item label="Active" value="Active" />
<Item label="Blocked" value="Blocked" />
</Picker>
</View>
</View>
